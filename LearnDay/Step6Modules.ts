//NameSpace
// <reference path="Validation.ts"/> Có thể gọi namespace từ 1 file .ts khác
namespace CheckValid { //Tạo 1 NameSpace có thêm CheckValid
    export interface TypeCheck {
        isAcceptable(s: string): boolean
    }; //Tạo 1 interface
    const lettersRegexp = /^[A-Za-z]+$/; //Xác Định Dạng chỉ có Chữ A-Z và a-z hoa và ko hoa
    const numberRegexp = /^[0-9]+$/; //Xác Định Dạng chỉ có số từ 0-9
    export class OnlyLetters implements TypeCheck { //Tạo 1 Class nhận interface và trả dữ liệu theo boolean
        isAcceptable(s: string) {
            return lettersRegexp.test(s) //Check s xem có đúng Định Dạng ko, nếu có return về true
        }
    }
    export class OnlyNumber implements TypeCheck {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s) //Check s xem length có dài > 5 không (lấy theo mẫu ZIP Code) và phải chỉ có mỗi số
        }
    }
}

let examples = ["Info", "1000", "50000"]; //Mẫu 1 số để check

let validators: { [s: string]: CheckValid.TypeCheck } = {}; //Tạo validator có định dạng [s: string]: CheckValid.TypeCheck (giống interface của Typecheck)
validators["Letters"] = new CheckValid.OnlyLetters() //Tạo nhóm Letters để cho OnlyLetters
validators["ZIP Code"] = new CheckValid.OnlyNumber() //Tạo nhóm ZIPCode để cho OnlyNumber

console.log(validators)
for (let s of examples){ //lặp qua các giá trị của examples
    for (let name in validators){ //lặp qua các giá trị (nhóm) trong validator -> Letters , ZIP Code
        console.log(validators[name].isAcceptable(s) ? "matches" : "does not match") //Sử dụng nhóm để lọc s qua từng nhóm xem hợp lệ với nhóm nào , nếu true sẽ trả về matches
        console.log(name, s)
    }
}
