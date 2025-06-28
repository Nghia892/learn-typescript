// Sản Phẩm: Táo, Chuối, Nho , 10K, 20K, 30K

interface MatHang {
    TenHang: string,
    GiaTien: number
}

interface MuaHang {
    TenHang: string,
    SoLuong: number,
    GiaTien?: number
}
class HangHoa {
    public CacLoai: MatHang[] = []

    ThemMatHang(loaihang: MatHang) {
        const Thucpham = {
            TenHang: loaihang.TenHang,
            GiaTien: loaihang.GiaTien
        }
        this.CacLoai.push(Thucpham)
    };

    XoaMatHang(loaihang: string) {
        const Sanphamxoa = this.CacLoai.find(sanpham => sanpham.TenHang === loaihang)
        if (Sanphamxoa)
        {
            console.log("Đã Xóa Mặt hàng" , Sanphamxoa)
            this.CacLoai = this.CacLoai.filter(item => item !== Sanphamxoa)
        }
        else
        {
            console.log("Không Tìm Thấy Mặt Hàng")
        }
    }
}

const ManagerHangHoa = new HangHoa();

function Mua(sanpham: MuaHang) {
    const SanPhamMua = ManagerHangHoa.CacLoai.find(mathang => mathang.TenHang === sanpham.TenHang)
    if (SanPhamMua) {
        return SanPhamMua.GiaTien * sanpham.SoLuong;
    }
    return 0
}


ManagerHangHoa.ThemMatHang({TenHang: "Nho", GiaTien: 10000})
ManagerHangHoa.ThemMatHang({TenHang: "Táo", GiaTien: 20000})
ManagerHangHoa.ThemMatHang({TenHang: "Chuối", GiaTien: 30000})

const TongTien: number = Mua({TenHang: "Chuối", SoLuong: 8})
console.log(TongTien)
console.log(ManagerHangHoa.CacLoai)