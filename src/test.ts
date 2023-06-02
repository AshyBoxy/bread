/* eslint-disable no-console */

// success
// the type parameter can be inferred correctly
// and works as expected
// this is wonderful


// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Test4<K extends Record<string, any>> {
    a: string;
    b: TestRecord<K>;

    constructor(a: string, b: TestRecord<K>) {
        this.a = a;
        this.b = b;
    }
}
interface TestCompatible<K> {
    a: K;
}
type TestRecord<K extends object> = {
    [P in keyof K]: TestCompatible<K[P]>
};

class Test2<K extends string | number> {
    a: K;
    constructor(a: K) {
        this.a = a;
    }
}
class Test3<K> implements TestCompatible<K> {
    constructor(public b: K, public a: K) { }
}

const b = new Test4("c", {
    hi: new Test2("hi"),
    bye: new Test2(69),
    woop: new Test3<object>({}, {})
});

console.log(b);
