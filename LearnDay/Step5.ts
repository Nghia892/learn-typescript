// Mapped Types
type Horse = {}                                        //
type OnlyBoolean = {                                   //
    [key: string]: boolean | Horse                     //Sử Dụng key: string để xác định giá trị cho key, và sẽ lầ key: boolean
}

const OnlyBooleanString: OnlyBoolean = {               //Tạo const sử dụng OnlyBoolean làm type
    test: true,                                        //Áp Dụng Type theo định dạng key: boolean
    nghia: false
}
//------------------------------------------
type Features = {                                      //Tạo 1 Type Feature
  darkMode: () => void;
  newUserProfile: () => void;
};

type OptionalType<Type> = {                            //Sử Dụng Mapped Types
    [Property in keyof Type]: boolean                  //Xác định PropertyKeys (example: darkMode, newUserProfile) của Features: về dữ liệu sẽ trả về là boolean
}

type FeaturOptinal = OptionalType<Features>            //Trả về darkmode: boolean, newUserProfile: boolean           

//----------------------------------------
type Features2 = {
    name: string,
    pass: number 
}
type ChangeType<Type> = {
    [Property in keyof Type]: Type[Property][]
}

type ChangeOpnial = ChangeType<Features2> //Trả về type name: string[]
//------------------------------------------
type XoaReadonlyType = {
    readonly name: string,
    readonly pass: number
}
type XoaReadonly<Type> = {
    -readonly [Property in keyof Type]: Type[Property]
    // [Property in keyof Type]-?: Type[Property] xóa ?: của Type ví dụ name?: string sẽ xóa đi ?: -> thành name: string
}

type Daxoareadonly = XoaReadonly<XoaReadonlyType> //Trả về Type đã bị xóa readonly

//-------------------------------------------
type Default = {
    name: string,
    key: number
}
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: Type[Property] //Lấy name của Property sau đó xài as để đổi tên thành getName (ví dụ) và sử dụng
                                                                                      //Capitalize để in hoa chữ cái đầu của tên Property
}
type GetDefault = Getters<Default> //Trả về getName: string

///-----------------------------------
type TypeExclu = {
    Test1: string,
    Test2: string,
    Test3: number
}
type XaiExcl<Type> = {
    [Property in keyof Type as Exclude<Property, "Test1">]: Type[Property] //Sử Dụng Exclude Để Xóa Test1 Trong Type
}

type Output = XaiExcl<TypeExclu>

//--------------------------------
type TypeSquare = { name: "Test1", x: 1, y: 2}
type TypeCircle = { name: "Test2", radius: 100}

type EventConfig<Type extends {name: string}> = { // Xác Định Type name: string
    [Property in Type as Property["name"]]: (Type: Property) => void; //Property nằm trong Type biến đổi thành giá trị của (name: "Test1")
                                                                      //Sau Đó : để lấy Type: Property để trả về dữ liệu tên của Type được gọi (Test1: (Type: TypeSquare) => Void;)  
}
type Back = EventConfig<TypeSquare | TypeCircle>

//---------------------------------
//Trả về true false

type FirstTF = {
    first: {name: "nghia892", radius: 1}
    second: {name: "Test2", pill: 100}
}

type scanhavepill<Type> = {
    [Property in keyof Type]: Type[Property] extends { pill: number} ? true : false //Kiểm tra xem có pill tồn tại không , nếu có trả về true và ngược lại
}

type Scan = scanhavepill<FirstTF> //first: false, second: true

// Conditional Types
interface Animal {
    first: string
}
interface Dog extends Animal{
    second: string
}
interface Cat {
    three: string
}
interface Cat2 {
    id: number
}
type Example1 = Dog extends Animal ? true : false //Check Xem Dog có nằm trong Animal không có trả về True, và ngược lại

type Example2 = Cat extends Animal ? string : number //Tương tự như vậy nếu false sẽ trả về number

type CatOrCat<T extends number | string> = T extends number ? Cat2 : Cat //Tạo 1 Type gọi T thuộc number hoặc string = T nếu là number Thì sẽ là Cat2 và else của nó sẽ là Cat

function DataCat<T extends number | string >(CatOrCat: T): CatOrCat<T>{ //Từ quy tắc trên tạo 1 function Type phải là number hoặc string, Và sử dụng để check xem T thuộc Cat hay Cat2
    throw "unimplemented";
}

let a = DataCat("typescript"); //Cat vì là string

let b = DataCat(2.8); //Cat2 vì là number

type InfoCat<T> = T extends { three: unknown } ? T["three"] : never;
type GetCat = InfoCat<Cat>

//Template Literal Types
type Template1 = "Email" | "Account"
type Template2 = "Password" | "Info"

type Lang = "vn" | "en" | "ja"
type AddId = (`${Template1 | Template2}_id`) //type AddId = "Email_id" | "Account_id" | "Password_id" | "Info_id"
type AddLang = (`${Lang}_${AddId}`)

//Recursive Types
type Json = string | number | boolean | Json[] | { [key: string]: Json }; //Json chứa gồm string | number -> t xài thêm { [key: string]: Json} để có thể gán ví dụ name: "Nghia892"

let JsonInfo: Json = {
    name: "Nghia892",
    pass: 1,
    enable: true,
    key: {name: "Test"}
}