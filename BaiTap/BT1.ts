// Bài tập 1: Xây dựng một hàm tính tổng (Cơ bản)

//Yêu cầu:

// Sử dụng kiểu number[] cho mảng đầu vào.
// Hàm phải xử lý trường hợp mảng rỗng (trả về 0).
// Viết thêm một phiên bản của hàm này sử dụng generic để hỗ trợ cả mảng số và mảng chuỗi (nếu chuỗi có thể chuyển thành số).


function SumArray(value: number[]): number {
    return value.length === 0 ? 0 : value.reduce((acc, curr) => acc + curr, 0) // Sử Dụng Value.reduce để tính tổng
} // Tạo 1 hàm sau đó tiến hành kiểm tra xem có phải rỗng không, nếu rỗng sẽ trả về 0

function SumArrayGeneric<T extends number | string>(value: T[]): number {
    if(value.length === 0){ return 0} // Kiểm Tra Rỗng sẽ trả về 0

    // let NumberTinh = []
    // for(const s of value){
    //     NumberTinh.push(Number(s))
    // }
    return value.reduce((acc, curr) => acc + Number(curr), 0) //Sử dụng tính tổng và chuyển curr về Number
}
// Thử Gọi
const Sum2 = SumArrayGeneric(['1','2', '7'])
console.log(Sum2)
const Sum1 = SumArray([1,2,3])
console.log(Sum1)

// -------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------
// Bài tập 2: Quản lý danh sách sinh viên (Trung bình)
// Mô tả: Tạo một hệ thống quản lý sinh viên đơn giản sử dụng interface và class trong TypeScript.

interface SinhVien {
    readonly id: number,
    ten: string,
    tuoi: number,
    diemso: string
}
type DiemSot = "A" | "B" | "C" | "D"

class ManagerSinhVien {
    private SinhVienTruong: SinhVien[] = []

    addSinhVien(dulieu: SinhVien) {
        const SinhVient = {
            id: dulieu.id,
            ten: dulieu.ten,
            tuoi: dulieu.tuoi,
            diemso: dulieu.diemso
        }
        this.SinhVienTruong.push(SinhVient)
        console.log('Đã Thêm Sinh Viên ', dulieu.ten, ' Vào Với Điểm Số: ', dulieu.diemso)
    }

    listSinhVienTheoDiemSo(diem: DiemSot) {
        const HocSinh = this.SinhVienTruong.filter(sv => sv.diemso === diem)
        if (HocSinh.length === 0) {
            return `Không tìm thấy sinh viên nào có điểm số ${diem}`
        }
        return HocSinh
    }

    TuoiTrungBinhSV() {
        const TuoiSinhVien = this.SinhVienTruong.map(sv => sv.tuoi)
        if (TuoiSinhVien.length === 0) {
            return 0
        }
        return TuoiSinhVien.reduce((acc, curr) => acc + curr) / TuoiSinhVien.length
    }
}

const Manager = new ManagerSinhVien()
Manager.addSinhVien({ id: 1, ten: "An", tuoi: 20, diemso: "A"});
Manager.addSinhVien({ id: 2, ten: "Bình", tuoi: 22, diemso: "B" });
console.log(Manager.listSinhVienTheoDiemSo("C"))
console.log(Manager.TuoiTrungBinhSV()); // 21