import { data } from "../scripts/array1.js";
import { SelectUI } from "../vendor/select-ui/select-ui.js";

const selectData = data.map(el => {
    return { value: el.name, id: el.id, dataProp: el.id }
});

document.addEventListener("DOMContentLoaded", function () {
    const selectInner = data[0];

    const selectInnerData = selectInner.items.map(el => {
        return { value: el.name, id: el.id, dataProp: el.id }
    })
    console.log(selectInnerData);

    const select2 = new SelectUI('#select-ui-estate-size', {
        selectedId: 'residence-studio',
        data: selectInnerData,
        onSelect(item) {
            document.getElementById("table-element").classList.add('row_visible');

            const resTable = createTable(data[0].items[0].items);
            document.querySelector('#table-element').innerHTML = resTable;
        }
    });
    console.log(select2);

    const select = new SelectUI('#select-ui-estate-type', {
        selectedId: 'residences',
        data: selectData,
        onSelect(item) {
            const selected = item.id;
            console.log(selected);
            const selectInner = data.find((el) => el.id === selected);
            select2.destroy();
            select2.data = selectInner.items.map(el => {
                return { value: el.name, id: el.id, dataProp: el.id }
            })

            select2.render();
            select2.setup();
        }
    });

    $('#slider--Residences').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        autoplay: false
    });
})

function createTableRow (row) {
    
    return `
    <tr class="table-row element-hover" id="table-row${row.id}">
                            <td class="residence-info-table__rows" id="number">${row.number}</td>
                            <td class="residence-info-table__rows" id="floor">${row.floor}</td>
                            <td class="residence-info-table__rows" id="name">${row.name}</td>
                            <td class="residence-info-table__rows" id="square">${row.square}</td>
                        </tr>`
}

function createTable (rows) {
    return rows.map(row => createTableRow(row));
}