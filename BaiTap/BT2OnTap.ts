//BT1: Xử lý đơn hàng trong cửa hàng trực tuyến
// Mô tả: Xây dựng hệ thống quản lý đơn hàng cho một cửa hàng trực tuyến, bao gồm thêm sản phẩm, tính tổng giá, và áp dụng giảm giá.

interface Product {
    id: number,
    productname: string,
    price: number,
    quantity: number
}

enum OrderStatus {
    Pending = "Pending",
    Processing = "Processing",
    Shipped = "Shipped",
    Delivered = "Delivered"
}

type Order = {
    id: number,
    product: Product,
    invoice: number,
    status: OrderStatus
}

class ManagerProduct{
    private Store: Product[] = []
    public Orders: Order[] = []
    AddProduct(arg: Product): void {
        if(this.Store.find(Product => Product.productname === arg.productname) != null){
            console.log('Đã Phát Hiện Đơn Hàng Trùng ID')
        }
        else{
            this.Store.push(arg)
            console.log(`Đã Thêm Sản Phẩm ${arg.productname} | Giá: ${arg.price} | Số Lượng: ${arg.quantity}`)
        }
    }

    RemoveProduct(arg: number): void {
        const ProductXoa = this.Store.find(Product => Product.id === arg)
        if (ProductXoa != null) {
            console.log(`Đã Xóa Sản Phẩm ${ProductXoa.id} | Tên: ${ProductXoa.productname}`)
            this.Store = this.Store.filter(Product => Product.id !== arg)
            console.log(this.Store)
        }
        else
        {
            console.log(`Ko tìm thấy ID: ${arg}`)
        }
    }
    KiemKho() {
        const ListHang = this.Store.map(Product => Product.price * Product.quantity)
        const SoTien = ListHang.reduce((acc, curr) => acc + curr)
        for (const s of this.Store){
            console.log(`Sản Phẩm: ${s.productname} | Số Lượng: ${s.quantity} | Giá: ${s.price} | Tổng Tiền: ${s.quantity * s.price}`)
        }
        console.log(`Tổng Tiền Sản Phẩm Kho Hàng ${SoTien}`)
    }

    DatHang(iddonghang: number){ 
        const OrderProduct = this.Store.find(Product => Product.id === iddonghang)
        const LastId = this.Orders.reduce((acc, curr) => {
            return Math.max(acc, curr.id);
        }, 0)
        if (OrderProduct != null) {
            const DonHang: Order = {
                id: LastId + 1,
                product: OrderProduct,
                invoice: OrderProduct.price,
                status: OrderStatus.Pending,
            }
            this.Orders.push(DonHang)
        }
    }

    ApplyCoupon(id: number, percent: number) {
        const OrderApply = this.Orders.find(Product => Product.id === id)
        const SoTienCoupon = OrderApply != null ? OrderApply.invoice - OrderApply.invoice * percent / 100 : console.log("BUG")
        console.log(`Số Tiên Cần Thanh Toán: ${OrderApply?.invoice} ` )
        console.log(`Đã Áp Dụng Giảm Giá ${percent}% -> Số Tiền Thanh Toán Là: ${SoTienCoupon}`)
        if (OrderApply != null){
            OrderApply.invoice = Number(SoTienCoupon)
        }
    }

    UpdateOrder(id: number, status: OrderStatus) {
        const OrderUpdate = this.Orders.find(Product => Product.id === id)
        if (OrderUpdate != null){
            OrderUpdate.status = status
        }
    }
}

const ManagerProducts = new ManagerProduct()
ManagerProducts.AddProduct({ id: 1, productname: "Laptop", price: 1000, quantity: 2 });
ManagerProducts.AddProduct({ id: 2, productname: "Iphone", price: 2000, quantity: 5 });
ManagerProducts.DatHang(1)
ManagerProducts.ApplyCoupon(1, 10)
ManagerProducts.UpdateOrder(1, OrderStatus.Shipped)
// ManagerProducts.RemoveProduct(2)
// ManagerProducts.KiemKho()