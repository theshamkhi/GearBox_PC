/* Page Devis */
document.addEventListener('DOMContentLoaded',() => {
    const boutton = document.getElementById('boutton');
    let tbody = document.getElementById('tbd');
        tbody.innerHTML=`
        <tr>
            <td>Produit1 - Description</td>
            <td>3</td>
            <td>150MAD</td>
            <td>red</td>
        </tr>
        `

    const a=document.getElementById('download');
    a.addEventListener('click',funprint);
    function funprint () {
        window.print();
    }
})