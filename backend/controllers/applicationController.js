import Application from "../models/Application.js";
import Job from "../models/Job.js";

// Apply to a job
export const applyToJob = async (req, res) => {
  const { jobId, resumeLink } = req.body;

  if (!jobId || !resumeLink) {
    return res.status(400).json({ message: "Job ID and Resume are required" });
  }

  try {
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if already applied
    const alreadyApplied = await Application.findOne({
      jobId,
      seekerId: req.user._id,
    });
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      jobId,
      seekerId: req.user._id,
      resumeLink,
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Apply Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in seeker's applications
export const getApplicationsBySeeker = async (req, res) => {
  try {
    const applications = await Application.find({ seekerId: req.user._id })
      .populate("jobId", "title description")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Fetch Applications Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete (withdraw) an application
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.seekerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await application.deleteOne();
    res.json({ message: "Application withdrawn successfully" });
  } catch (error) {
    console.error("Delete Application Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
