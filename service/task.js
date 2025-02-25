import { route } from "../constants/routePath";
import AxiosRequest from '../configs/api';

const TaskService = {};

TaskService.create = (payload) => AxiosRequest.post(
    `/api/${route.tasks}`,
    payload
);

TaskService.getTasks = () => AxiosRequest.get(
    `/api/${route.tasks}`
);

TaskService.getTaskById = (taskId) => AxiosRequest.get(
    `/api/${route.tasks}/${taskId}`,
    payload
);

TaskService.update = (taskId, payload) => AxiosRequest.put(
    `/api/${route.tasks}/${taskId}`,
    payload
);

TaskService.delete = (taskId) => AxiosRequest.delete(
    `/api/${route.tasks}/${taskId}`
);

export default TaskService;