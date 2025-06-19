import Job from "../models/Job.js";
import Company from "../models/Company.js";

// Creating a job
export const createJob = async (req, res) => {
  const { title, description, requirements, salary, companyId } = req.body;

  if (!title || !companyId) {
    return res.status(400).json({ message: "Title and Company are required" });
  }

  try {
    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      postedBy: req.user._id,
      companyId,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create Job Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name email")
      .populate("companyId", "name location");
    res.json(jobs);
  } catch (error) {
    console.error("Get Jobs Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name email")
      .populate("companyId", "name location");

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (error) {
    console.error("Get Job Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updates = req.body;
    Object.assign(job, updates);
    await job.save();

    res.json(job);
  } catch (error) {
    console.error("Update Job Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted" });
  } catch (error) {
    console.error("Delete Job Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
