document.addEventListener("DOMContentLoaded", function () {
    const select = new SelectUI('#select-ui-estate-type', {
        selectedId: '2',
        errorText: 'Выберите время*',
        nameSelect: 'select-time',
        selectedDataProp: '1',
        data: [
            { id: '1', value: 'Резиденции', dataProp: '0' },
            { id: '2', value: 'Пентхаусы', dataProp: '1' },
            { id: '3', value: 'Урбан-виллы', dataProp: '2' },
        ],
        onSelect(item) {
            document.getElementById("slidermy").style.display = 'none';
            document.getElementById("bottom-row").classList.add('row_visible');
        }
    });
    const select2 = new SelectUI('#select-ui-estate-size', {
        selectedId: '2',
        errorText: 'Выберите время*',
        nameSelect: 'select-time',
        selectedDataProp: '1',
        data: [
            { id: '1', value: 'Резиденция с одной спальней', dataProp: '0' },
            { id: '2', value: 'Резиденция с двумя спальнями', dataProp: '1' },
            { id: '3', value: 'Резиденция с одной спальней', dataProp: '2' },
        ],
        onSelect(item) {
            console.log('selected Item', item)
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
