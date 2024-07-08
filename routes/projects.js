
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Project = require('../models/Project');


router.post('/', auth, async (req, res) => {
    const { projectTheme, reason, type, category, priority, division, department, startDate, endDate, location , status} = req.body;

    try {
        const newProject = new Project({
            user: req.user.id,
            projectTheme,
            reason,
            type,
            category,
            priority,
            division,
            department,
            startDate,
            endDate,
            location,
            status
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET api/projects/getall
// @desc     Get all projects
// @access   Public
router.get('/getall', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/updateStatus', auth, async (req, res) => {
    const { projectId, status } = req.body;
  
    try {
      let project = await Project.findById(projectId);
      if (!project) return res.status(404).send('Project not found');
  
      project.status = status;
      await project.save();
      res.send(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


  //for dashboard card
  router.get('/counters', async (req, res) => {
    try {
      const totalProjects = await Project.countDocuments();
      const closedProjects = await Project.countDocuments({ status: 'Closed' });
      const runningProjects = await Project.countDocuments({ status: 'Running' });
      const cancelledProjects = await Project.countDocuments({ status: 'Cancelled' });
  
      res.json({
        totalProjects,
        closedProjects,
        runningProjects,
        cancelledProjects,
      });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });
  
  // Endpoint to get the Closure Delay counter
  router.get('/closure-delay-counter', async (req, res) => {
    try {
      const closureDelayProjects = await Project.countDocuments({
        status: 'Running',
        endDate: { $lt: new Date() },
      });
  
      res.json({ closureDelayProjects });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
