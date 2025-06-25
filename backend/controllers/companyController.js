import Company from "../models/Company.js";

// Create a new company
export const createCompany = async (req, res) => {
  const { name, description, location } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Company name is required" });
  }

  try {
    const existing = await Company.findOne({ ownerId: req.user._id });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You already have a company profile" });
    }

    const company = await Company.create({
      name,
      description,
      location,
      ownerId: req.user._id,
    });

    console.log("BODY RECEIVED:", req.body);

    res.status(201).json(company);
  } catch (error) {
    console.error("Create Company Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update company
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) return res.status(404).json({ message: "Company not found" });
    if (company.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updates = req.body;
    Object.assign(company, updates);
    await company.save();

    res.json(company);
  } catch (error) {
    console.error("Update Company Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in user's company
export const getCompanyByUser = async (req, res) => {
  try {
    console.log("Fetching company for user:", req.user._id);

    const company = await Company.findOne({ ownerId: req.user._id });
    if (!company) {
      res.status(404);
      throw new Error("Company not found for this user");
    }

    res.json(company);
  } catch (error) {
    console.error("Get Company Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
