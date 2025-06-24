// Boolean là 1 loại type ví dụ: True False 
// let là gán cho 1 biến const là gán cho 1 biến không thể thay đổi
let Enable: boolean = true
Enable = false
const Ena: boolean = true
// Ena = false -> Sẽ Báo Lỗi

// Number : Type chỉ định số 
let sothutu: Number = 1
sothutu = 1.5
// sothutu = "Nghia" -> Không thể gán string vì đây là number

// String -> Type Dạng chữ phải có ""
let Ten: String = "Nghia"
Ten = "Rename Nghia"

//Void : 1 type cho 1 hàm không trả về giá trị
// function -> return không trả về 1 giá trị

//undefined -> hiểu nôn na là 1 giá trị giống null không có gì hoặc chưa khởi tạo

// Gán vào Khach cho có 2 biến là id là Number, name là String
// readonly như const khiến id không thể thay đổi giá trị sau này
type Khach = {
    readonly id: Number,
    name: String,
}
// Sử Dụng const để gọi Khachhang chọn type Khach để có 2 biến thông tin là id và name
const KhacHang: Khach = {id: 1, name: "Name"}

//interface là 1 dạng như type nhưng theo tài liệu có vẻ nó có thể extends , thêm đối tượng vào không lỗi như type
interface Khach2 {
    id: Number,
    name: String,
}
// Bổ sung thêm 1 đối tượng cho Khach2
interface Khach2 {
    Active: boolean
}
// Lấy Đối Tượng của Khach2 vào KhachThem2
interface KhachThem2 extends Khach2 {
    Thongtin: String
}
const KhachHang2: KhachThem2 = {id: 1, name: "Nghia", Active: true, Thongtin: "Online"}

//Class là 1 lớp 
class Player {
    // Khởi tạo trước 2 biến là username và password sẵn bên trong để có thể constructor mà không lỗi
    private username: string;
    public password: number;
    // Sử dụng constructor để khởi tạo... (chưa hiểu, chưa thể giải thích rõ phần constructor)
    constructor(username: string, password: number){
        this.username = username;
        this.password = password;
    }
}
// sử dụng new để tạo 1 profile username là Nghia892 và password là 123123
const getplayer = new Player("Nghia892", 123123);
// console.log(getplayer.username) Private -> Chỉ có thể tham chiếu bên trong class
// console.log(getplayer.password) Public -> có thể tham chiếu phía bên ngoài

// Enum nó khá giống 1 list (Xếp Đầu list là số 0 và tiếp theo là 1)
enum XepHang {
    CaoThu,
    KimCuong,
    BachKim,
    Vang
}
// Ta Cũng có thể gán cho mỗi 1 loại thành 1 string bất kỳ
enum Ranking {
    ChienTuong = "Cao Thủ",
    CaoThu = 5,
    KimCuong, // KimCuong sẽ số 6
    BachKim
}
console.log(XepHang.CaoThu)

// Array là dạng giá trị nhưng dành cho list [1,2,3]
//Ví dụ 
const TheCao: Number[] = [10000,20000,30000]
//Thường xài Number[] sẽ dễ hơn thay vì xày Array<number>
//và có cả Vừa Number[] vừa String[] như
const LoaiThe: (string | number)[] = ["VIETTEL", 500000, "Mobie"]


//Tuple 1 kiểu dạng như Array nhưng sẽ là giá trị và biết rõ thứ tự, có thể ứng dụng như
type Tuple = [String, Number]
const UngDungTuple: Tuple = ["nghia", 1000] // Sử Dụng Tuple làm type và tạo Array theo String và number theo thứ tự, theo docs thì vẫn có thể áp dụng cho function như
// tạo 1 function lấy 1 arg là tup và type là Tuple
function TupleFunc(tup: Tuple){
    const a = tup[0]; // Gán Cho a là tup[0] theo Array là String
    const b = tup[1]; // Number
}
TupleFunc(["Nghia", 1]) // gọi function = Array

// Object đối tượng
// Tạo 1 function lấy User để chọn 2 object là name và id lần lượt String và Number để print ra
function DocTen(User: {name: String, id: Number}){
    console.log(User.name, User.id)
}
// Chỉ Việc Gọi theo function...
DocTen({name: "Jonny", id: 1})