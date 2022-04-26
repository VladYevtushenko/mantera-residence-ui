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

    const select2 = new SelectUI('#select-ui-estate-size', {
        // selectedId: 'residence-studio',
        placeholder: "Количество спален",
        data: selectInnerData,
        onSelect(item) {
            const selected = window.select.selectedId;
            const selectInner = data.find((el) => el.id === selected);

            const selected2 = item.id;
            const selectInner2 = selectInner.items.find((el) => el.id === selected2);

            const resTable = createTable(selectInner2.items);
            document.querySelector('#table-element').innerHTML = "";
            resTable.map(tr => document.querySelector('#table-element').append(tr))
        }
    });

    window.select = new SelectUI('#select-ui-estate-type', {
        selectedId: 'residences',
        data: selectData,
        onSelect(item) {
            document.querySelector('#table-element').innerHTML = "";

            const selected = item.id;
            const selectInner = data.find((el) => el.id === selected);
            select2.destroy();
            select2.valueInput = "Количество спален";
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
        <td class="residence-info-table__rows"><span>№</span><span class="residence-info-table__head">${row.number}</span></td>
        <td class="residence-info-table__rows"><span>этаж:</span>&nbsp;${row.floor}</td>
        <td class="residence-info-table__rows">${row.name}</td>
        <td class="residence-info-table__rows"><span class="residence-info-table__head">${row.square}</span><span>&nbsp;кв.м.</span></td>
    `;

    tr.addEventListener('click', event => {
        event.stopPropagation();
        showDetail(JSON.parse(event.path[1].getAttribute('data-item')))
    })

    return tr;

}

function createTable(rows) {
    return rows.map(row => createTableRow(row));
}

function showDetail(detail) {
    const container = document.querySelector("#image");
    container.querySelector("img").setAttribute("src", detail.imageLink[0]);
    container.querySelector("#pdf a").setAttribute("href", detail.pdf);
    container.querySelector("#view a").setAttribute("href", detail.view);

    container.classList.add("row_visible");
    document.querySelector("#slidermy").classList.add("row_hidden");
}