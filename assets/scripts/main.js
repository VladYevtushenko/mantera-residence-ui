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
            const resTable = createTable(data[0].items[0].items);
            console.log(resTable);
            resTable.map(tr => document.querySelector('#table-element').append(tr))
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

function createTableRow(row) {

    const tr = document.createElement("tr");
    tr.classList.add("table-row");
    tr.classList.add("element-hover");
    tr.id = `tr-${row.number}`;
    tr.setAttribute('data-item', JSON.stringify(row.detail));

    tr.innerHTML = `
        <td class="residence-info-table__rows">${row.number}</td>
        <td class="residence-info-table__rows">${row.floor}</td>
        <td class="residence-info-table__rows">${row.name}</td>
        <td class="residence-info-table__rows">${row.square}</td>
    `;

    tr.addEventListener('click', event => {
        event.stopPropagation();
        console.log(event)
        showDetail(JSON.parse(event.path[1].getAttribute('data-item')))
    })

    console.log(tr);

    return tr;

}

function createTable(rows) {
    return rows.map(row => createTableRow(row));
}

function showDetail(detail) {
    console.log(detail);
    const container = document.querySelector("#image");
    container.querySelector("img").setAttribute("src", detail.imageLink[0]);
    container.querySelector("#pdf a").setAttribute("href", detail.pdf);
    container.querySelector("#view a").setAttribute("href", detail.view);

    container.classList.add("row_visible");
    document.querySelector("#slidermy").classList.add("row_hidden");
}