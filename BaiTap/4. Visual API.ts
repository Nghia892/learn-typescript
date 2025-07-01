// Bài 4: Xử lý dữ liệu API đơn giản
//Mô tả: Xây dựng một ứng dụng gọi API (giả lập) và xử lý dữ liệu trả về bằng TypeScript.
interface User {
    id: number,
    name: string,
    email: string,
    role: "admin" | "user"
}

async function fetchUsers(): Promise<User[]> {
    return new Promise((resolve) => {
        console.log('ĐANG GỌI API')

        setTimeout(() => {
            console.log('LẤY API HOÀN TẤT')
            resolve([
                { id: 1, name: "Nguyen Van A", email: "a@example.com", role: "admin" },
                { id: 2, name: "Tran Thi B", email: "b@example.com", role: "user" },
                { id: 3, name: "Le Van C", email: "c@example.com", role: "admin" },
            ]);
        }, 2000);
    })
}

class UserServices {
    public UserList: User[] = []
    addUser(user: User) {
        try {
            if(this.UserList.some(UserCheck => UserCheck.id === user.id)){
                console.log('ĐÃ CÓ USER TRÙNG ID')
                return false
            }
            if(user.role != "admin" && "user"){
                console.log('role không phải là admin hoặc user')
                return false
            }
            if(!user.email.includes("@")){
                console.log('EMAIL KO HỢP LỆ')
                return false
            }
            this.UserList.push(user)
            return true
        }
        catch{
            return false
        }
    }

    async getUser(): Promise<User[]> {
        try {
            this.UserList = await fetchUsers()
            return this.UserList
        }
        catch (error){
            console.log(error)
            return []
        }
    }

    async getAdmins(): Promise<User[]> {
        try {
            if (this.UserList.length === 0){
                await this.getUser()
            }
            return this.UserList.filter(user => user.role === "admin")
        } catch(error){
            console.error("Lỗi khi lọc admin:", error);
            return []
        }
    }
}

async function ManagerUser() {
    const UserService = new UserServices()
    await UserService.getUser().then(user => {console.log(user)})
    UserService.addUser({id: 11, name: "User C", email: "trongnghiad25@gmail.com", role: "admin"})
    UserService.addUser({id: 12, name: "User B", email: "trongnghiad30@gmail.com", role: "user"})
    console.log(await UserService.getAdmins());
}
ManagerUser();
export {};