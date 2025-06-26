// Function Learn
function number1(a: number, b: number): number {
    return a + b
} //Function có a và b là number, trả về kết quả về là number và phép tính +
const SoNhan = (a: number, b: number): number =>{
    return a * b
} //const SoNhan và nó khá giống function nhưng phép tính *
console.log(SoNhan(10,100))


let Sochia: (a: number, b: number) => number; // Tạo cho Sochia có a và b là number và cấu trúc

Sochia = (a,b) => {
    return a / b
} 
console.log(Sochia(100,5)) // dựa theo cấu trúc đó mà lấy a / b 


//
function Step1(fn: (a:string) => void) { //tạo fn: (a:string) để có cấu trúc giá trị bên trong fn sẽ có 1 a phải là string
    fn("Hello Ưorld")
}
function Step2(a: string) {
    console.log(a)
}
Step1(Step2)

//Function + generic
function Gen<Type>(arg: Type[]): Type | undefined {  //Xài generic để xá định type , và arg: Type[] là array
    return arg[0]
}
Gen([1,2,3])