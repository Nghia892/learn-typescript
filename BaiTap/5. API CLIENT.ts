interface Employee {
    id: number,
    name: string,
    email: string,
    department: string,
    role: "Developer" | "Designer" | "Manager"
} 
interface ApiResponse<T> {
    data: T | T[] | null,
    status: number,
    error: string | null
}
interface ApiError{
    message: string | null,
    code: string
}

class EmployeeApiClient {
    private Employ: Employee[] = []
    async getEmployees(): Promise<ApiResponse<Employee>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const Response: ApiResponse<Employee> = {
                        data: this.Employ,
                        status: 200,
                        error: null
                    }
                    // console.log(Response)
                    resolve(Response)
                } catch(err) {
                    const ErrorMessage: ApiError = {
                        message: "Lỗi Không Thể Nhận Dữ Liệu",
                        code: "500"
                    }
                    const ResponseError: ApiResponse<ApiError> = {
                        data: ErrorMessage,
                        status: 500,
                        error: "Không Thể Lấy Dữ Liệu"
                    }
                    // console.log(ResponseError)
                    reject(ResponseError)
                }
            }, 2000);
        })
    }
    async addEmployee(emp: Employee): Promise<ApiResponse<Employee>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if(emp === null){
                        throw new Error('Lỗi Không Thể Xử Lý NULL');
                    }
                    if(!emp.email.includes("@")){
                        throw new Error('Email Không Hợp Lệ')
                    }
                    if (emp.role === "Developer" || emp.role === "Designer" || emp.role === "Manager") {
                        //no thing
                    }else{
                        throw new Error('Role không Hợp Lệ')
                    }
                    const Response: ApiResponse<Employee> = {
                        data: emp,
                        status: 200,
                        error: null
                    }
                    this.Employ.push(emp)
                    resolve(Response)
                } catch(err) {
                    if(typeof err === "string"){
                        const ErrorMessage: ApiError = {
                            message: err,
                            code: "500"
                        }
                        const ResponseError: ApiResponse<ApiError> = {
                            data: ErrorMessage,
                            status: 500,
                            error: "Không Thể Lấy Dữ Liệu"
                        }
                        reject(ResponseError)
                    }else{
                        reject(err)
                    }
                }
            }, 1000);
        })
    }

    async updateEmploy(id: number, employee: Partial<Employee>): Promise<ApiResponse<Employee>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const EmployIndex = this.Employ.findIndex(emp => emp.id === id)
                    if (EmployIndex === -1) {
                        throw new Error(`Không tìm thấy nhân viên với ID: ${EmployIndex}`);
                    }
                    const GetEmployy = this.Employ[EmployIndex]
                    console.log(GetEmployy)
                    const UpdateEMP = {...GetEmployy, ...employee}
                    this.Employ[EmployIndex] = UpdateEMP

                    const Response: ApiResponse<Employee> = {
                        data: UpdateEMP,
                        status: 200,
                        error: "Không Thể Lấy Dữ Liệu"
                    }
                    resolve(Response)
                } catch(err){
                    if(typeof err === "string"){
                        const ErrorMessage: ApiError = {
                            message: err,
                            code: "500"
                        }
                        const ResponseError: ApiResponse<ApiError> = {
                            data: ErrorMessage,
                            status: 500,
                            error: "Không Thể Lấy Dữ Liệu"
                        }
                        reject(ResponseError)
                    }else{
                        reject(err)
                    }
                }
            }, 1000);
        })
    }
    async deleteEmploy(id: number): Promise<ApiResponse<null>> {
        console.log('START DELETE')
        const maxRetries = 3;
        const delayMs = 1000;
        let lastError: any = null;
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        for (let attemp = 1; attemp <= maxRetries; attemp++){
            try {
                console.log(`${attemp} Lượt Thử`)
                const EmployDel = this.Employ.find(emp => emp.id === id)
                if(EmployDel != null){
                    this.Employ = this.Employ.filter(emp => emp.id !== id)
                    const Response: ApiResponse<null> = {
                        data: null,
                        status: 200,
                        error: "Không Thể Lấy Dữ Liệu"
                    }
                    return Promise.resolve(Response)
                }else{
                    throw new Error('Lỗi Không Tìm Thấy ID')
                }
            }catch(err){
                lastError = err;
                console.error(`Attempt #${attemp} failed:`, (err as Error).message);
                if (attemp === maxRetries) {
                    console.error(`All ${maxRetries} attempts failed. Reporting error.`);
                }
                await wait(1000)
            }
        }
        const errorMessage: ApiError = {
            message: (lastError as Error)?.message || 'An unknown error occurred after multiple retries.',
            code: "500"
        };

        const responseError: ApiResponse<null> = {
            data: null,
            status: 500,
            error: "Thao tác xóa thất bại sau nhiều lần thử."
        };

        // Ném lỗi để Promise bị reject, cho phép tầng gọi (caller) bắt được nó
        return Promise.reject(responseError);
    }
}

async function Main(){
    const ManagerAPI = new EmployeeApiClient();
    await ManagerAPI.addEmployee({id: 1, name: "Trần văn A", email: "tranvana@gmail.com", department: "A", role: "Designer"})
        .then(r => {
            console.log('API ADD EMPLOYEE SUCCESS')
            console.log(r)
        })
        .catch(e => {console.log(e)})

    // await ManagerAPI.updateEmploy(1, {department: "B"})

    // await ManagerAPI.getEmployees().then(Response => {
    //     console.log('GET ALL EMPLOYEE SUCCESS')
    //     console.log(Response)
    // }).catch(reject => {console.log(reject)})
    await ManagerAPI.deleteEmploy(1).then(resp => {console.log(resp)}).catch(err => {console.log(err)})
}
Main()
export {};