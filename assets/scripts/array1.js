const data = [
    {
        name: "Резеденции", 
        id: "residences",
        items: [
            {
                name: "Резеденция-студия",
                id: "residence-studio",
                items: [
                    {
                        number: '1',
                        floor: '1',
                        name: 'Apartment',
                        square: '23',
                        detail: {
                            image: [
                                'https://',
                            ],
                            pdf: 'https://',
                            view: 'https://',
                        }
                    }
                ]
            },
            {name: "Резеденция с одной спальней"},
            {name: "Резеденция с двумя спальней"},
        ]
    },
    { name: "Пентхаусы" },
    { name: "Урбан-Виллы" },
];

// ---------------------- //

const selectData = data.map(el => {
    return {value: el.name, id: el.id, dataProp: el.id}
});

const select = new SelectUI('#select-ui', {
    placeholder: 'Выберите элемент',
    selectedId: '2',
    errorText: 'Выберите время*',
    nameSelect: 'select-time',
    selectedDataProp: '1',
    data: selectData,
    onSelect(item) {
        document.getElementById("slidermy").style.display = 'none';
        document.getElementById("image").style.display = 'block';

        const selected = item.id;
        createSecondSelect(selected);
    }
});

const selected = "residences";

createSecondSelect(selected);

function createSecondSelect(firstSelectId) {
    const selected = firstSelectId;

    const selectInner = data.find((el) => el.id === selected);
    
    const selectInnerData = selectInner.map(el => {
        return {value: el.name, id: el.id, dataProp: el.id}
    })
    
    const select2 = new SelectUI('#select-ui-2', {
        placeholder: 'Выберите элемент',
        selectedId: '2',
        errorText: 'Выберите время*',
        nameSelect: 'select-time',
        selectedDataProp: '1',
        data: selectInnerData,
        onSelect(item) {
            console.log('selected Item', item)
        }
    });
}