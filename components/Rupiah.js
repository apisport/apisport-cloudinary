//@ts-check
import toRupiah from '@develoka/angka-rupiah-js';

const rupiah = (number) => {
    // return new Intl.NumberFormat("id-ID", {
    //     style: 'currency',
    //     currency: 'IDR'
    // }).format(number);
    return toRupiah(number, { floatingPoint: 0 })
}

export default rupiah
