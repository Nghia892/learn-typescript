//Hệ Thống Quản Lý Todo-List
//Mô tả: Xây dựng một ứng dụng quản lý công việc với các tính năng thêm, hoàn thành, và lọc công việc theo trạng thái.

interface Task {
    id: number,
    task: string,
    trangthai: boolean,
    date: Date
}

class TaskManager {
    private Task: Task[] = []
    addTask(arg: string){
        const LastId = this.Task.reduce((acc, curr) => {
            return Math.max(acc, curr.id);
        }, 0)
        const TaskAdd: Task = {
            id: LastId + 1,
            task: arg,
            trangthai: false,
            date: new Date()
        }
        console.log(TaskAdd)
        this.Task.push(TaskAdd)
    }

    completedTask(task: number){
        const TaskFind = this.Task.find(Task => Task.id === task)
        if(TaskFind != null){
            TaskFind.trangthai = true
            return true
        }
        else
        {
            return false
        }
    }
    getTaskByStatus(status: number){
        const TaskFindStatus = this.Task.find(Tasks => Tasks.id === status)
        if(TaskFindStatus != null){
          console.log(TaskFindStatus)
        }
    }
}
const TaskMN = new TaskManager()
TaskMN.addTask("Learn TypeScript")
TaskMN.completedTask(1)
TaskMN.getTaskByStatus(1)