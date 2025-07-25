import {
  AddTaskInProjectService,
  AssignTaskToUserByEmailService,
  DeleteTaskService,
  GetTasksByProjectService,
  UpdateStatusService,
  UpdateTaskDetailesService,
} from "./task.service.js";

export const AddTaskInProjectController = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      projectId: req.params.projectId,
      //   createdBy: req.user.id,
    };

    await AddTaskInProjectService(taskData);
    return res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
      errors: error.errors,
    });
    return;
  }
};

export const AssignTaskByEmailController = async (req, res) => {
  try {
    if (!req.body || !req.params.taskId || !req.body.email) {
      res.status(401).json({
        status: "error",
        message: "Bad Request email and task Id should be in proper form",
      });
      return;
    }

    const { email } = req.body;
    const { taskId } = req.params;

    await AssignTaskToUserByEmailService(email, taskId);

    res.status(200).json({
      status: "success",
      message: "Task Assigned Successfully",
    });
    //TODO
    // Mailing Service To Notify the user that he has been assigned To a task
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
      errors: error.errors,
    });
    return;
  }
};

export const DeleteTaskController = async (req, res) => {
  //TODO
  //Middle ware (IsOwner To Check (It's A field In The Table Called TaskCreator))
  try {
    const { taskId } = req.params;
    if (!taskId) {
      res.status(400).json({
        status: "error",
        message: "Bad Request id should be sent",
      });
      return;
    }

    await DeleteTaskService(taskId);
    res.status(200).json({
      status: "success",
      message: "Task Assigned Successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
      errors: error.errors,
    });
    return;
  }
};

export const UpdateTaskStatusController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!taskId || !status) {
      res.status(400).json({
        status: "error",
        message: "Bad Request please provide a valid status and taskID",
      });
      return;
    }

    await UpdateStatusService(taskId, status);

    res.status(200).json({
      status: "Success",
      message: "Task Status Been Updated Successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
      errors: error.errors,
    });
    return;
  }
};

export const GetTasksBtProjectController = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, pirority } = req.query;

    const tasks = await GetTasksByProjectService(projectId, {
      status,
      pirority,
    });

    if (!tasks) {
      res.status(400).json({
        status: "error",
        message: "Not Found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: tasks,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
      errors: error.errors,
    });
  }
};

export const UpdateTaskDetailsController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updateData = req.body;

    if (!taskId) {
      res.status(400).json({ message: "Task ID is required" });
      return;
    }

    const task = await UpdateTaskDetailesService(taskId, updateData);

    res.status(200).json({
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
      errors: error.errors,
    });
  }
};
