interface KhachHang {
    id?: number,
    tenkh: string,
    thongtin: string,
}
class Khachhang {
    Khach: KhachHang[] = [];

    ThemKhachHang(kh: KhachHang): void {
        if (kh && kh.tenkh && kh.thongtin) {
            const NewId = this.Khach.length > 0 ? Math.max(...this.Khach.map(k => k.id ?? 0)) + 1 : 1 ;
            const RegKhach: KhachHang = {
                id: NewId,
                tenkh: kh.tenkh,
                thongtin: kh.thongtin
            };
            this.Khach.push(RegKhach);
        }
    }
    getDanhSachKhach(): KhachHang[] {
        return this.Khach;
    }
}
interface DonHang {
    tendon: string,
    sotien: number
}
function CheckKhac(don: DonHang){
    console.log(don)
}
const khachHangManager = new Khachhang();

const KhachDauTien: KhachHang = {
    tenkh: "Trần Bảo Châu",
    thongtin: "Đến Từ Phú Yên"
}

const KhachDauT2 = {
    tenkh: "Đỗ Trọng Nghĩa",
    thongtin: "Đến Từ TPHCM"
} as KhachHang

khachHangManager.ThemKhachHang(KhachDauTien);
khachHangManager.ThemKhachHang(KhachDauT2);

let dathang = {
    tendon: "Beta Box",
    sotien: 100
}
// generic
function Generic<Type>(loai: Type): Type{
    return loai
}
interface MoreGeneric {
    id: number,
    name: string
}
function More<T,U extends MoreGeneric>(loai: T, valuetwo: U): object {
    console.log(loai, valuetwo)
    return {
        loai,
        valuetwo
    }
}
const TestFunc: MoreGeneric = {
    id: 1,
    name: "nghia"
}
const CallFunc = More("Nghia", TestFunc)
// union
interface A {
  a: string
}

interface B {
  b: number
}

type mathang = string | number
type AB = A & B
let gamepass: mathang = "Katana"
let Mathang2: AB = {a: "1", b: 2}
gamepass = 1;


let LoaiThe = [10000,20000,30000];
LoaiThe.forEach((item) => console.log(item))
CheckKhac(dathang);
console.log(khachHangManager.Khach)