const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Job = require("../models/Job");

const getAllJob = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdBy');

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}


const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await Job.findOne({ _id: jobId, createdBy: userId })

    if (!job) {
        throw new NotFoundError(`not found job with ${jobId} `)
    }

    res.status(StatusCodes.OK).json({ job });
}


const createJob = async (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        throw new BadRequestError('please provide company and position');
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(job);
}


const updateJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, body: { company, position } } = req;

    if (company === '' || position === '') {
        throw new BadRequestError('company or position field connot be empty!');
    }

    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { runValidators: true, new: true }
    );

    if (!job) {
        throw new NotFoundError(`not found job with ${jobId} `)
    }

    res.status(StatusCodes.OK).json({ job });
}


const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId })

    if (!job) {
        throw new NotFoundError(`not found job with ${jobId} `)
    }

    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllJob,
    getJob,
    createJob,
    updateJob,
    deleteJob
}