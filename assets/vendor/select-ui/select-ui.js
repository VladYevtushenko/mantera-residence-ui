class SelectUI{
    constructor(selector, options){
        this.$el = document.querySelector(selector);
        this.selectedId = options.selectedId;
        this.selectedDataProp = options.selectedDataProp;
        this.data = options.data || [];
        // this.placeholder = options.placeholder || 'Placeholder по умолч.';
        this.errorText = options.errorText || '';
        this.nameSelect = options.nameSelect || 'select';
        this.fakeSelect = document.querySelector('.select-ui-fake'); 
        this.onSelect = options.onSelect;  
        this.valueInput = '';   
        this.arrValues = [];    

        this.render();
        this.setup();
    }

    render(){
        this.$el.classList.add('select-ui');
        this.$el.innerHTML = this.getTemplate();
        this.hideFakeSelect();
    }

    setup(){
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);

        this.$value = this.$el.querySelector('[data-type="value"]');
        this.$input = this.$el.querySelector('.select-ui__input');
        this.$inputName = this.$input.querySelector('.form-item__name');
        this.$hiddenSelect = this.$el.querySelector('.select-ui__hidden-select');
    }

    getTemplate = () => {
        let cls = '';
        // this.valueInput = this.placeholder;

        if (this.selectedDataProp || this.selectedId) {
            if (this.selectedDataProp === undefined) {
                this.arrValues = this.data.filter(item => item.id === this.selectedId);
            } else {
                this.arrValues = this.data.filter(item => item.id === this.selectedDataProp);
            }
            cls = 'selected';
            if (this.arrValues[0]) {
                this.valueInput = this.arrValues[0].value;
            }
        }        

        return `
            <div class="select-ui__backdrop" data-type="backdrop"></div>
            <div class="select-ui__input ${cls}" data-type="input">
                
                <span data-type="value">${this.valueInput}</span>
            </div>
            <div class="select-ui__dropdown">
                <ul class="select-ui__list">
                    ${this.mapItems().join('')}
                </ul>
            </div>
            <select class="select-ui__hidden-select" name="${this.nameSelect}" required data-validate-text-invalid="${this.errorText}">
                <option value="">Выберите пункт</option>
                ${this.mapOptionsSelect().join('')}
            </select>
        `
    }

    mapItems = () => {
        const items = this.data.map(item => {
            let cls = '';
    
            if (this.selectedDataProp === undefined) {
                if (item.id === this.selectedId){
                    cls = 'selected';
                }
            } else {
                if (item.dataProp === this.selectedDataProp){
                    cls = 'selected';
                }
            }
    
            return `
                <li class="select-ui__item ${cls}" data-type="item" data-id=${item.id} data-prop="${item.dataProp}">${item.value}</li>
            `
        });

        return items;
    }

    mapOptionsSelect = () => {
        const optionsSelect = this.data.map(option => {
            let selected = '';
    
            if (this.selectedDataProp === undefined) {
                if (option.id === this.selectedId){
                    selected = 'selected';
                }
            } else {
                if (option.dataProp === this.selectedDataProp){
                    selected = 'selected';
                }
            }
            
            return `
                <option class="select-ui__hidden-option" value="${option.value}" ${selected}>${option.value}</option>
            `
        });

        return optionsSelect;
    }

    clickHandler(event){     
        const {type} = event.target.dataset;
        
        if (type === 'input' || type === 'value'){
            this.toggle();
        } else if (type === 'item'){
            const id = event.target.dataset.id;
            const dataProp = event.target.dataset.prop;
            this.select(id, dataProp);           
        } else if (type === 'backdrop'){
            this.close();
        } 
    }

    select(id, dataProp){
        this.selectedId = id;
        this.selectedDataProp = dataProp;
        this.$value.innerHTML = this.current.value;

        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected'); 
        });        
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');

        this.$input.classList.add('selected'); //для лейбла
        if (this.$el.nextElementSibling) { //чтобы не было ошибки и лейбла одновременно
            this.$inputName.style.display = 'none';
        }        
        this.$hiddenSelect.value = this.current.value; //присваиваем в скрытый селект выбранное значение

        this.onSelect ? this.onSelect(this.current) : null;
        this.close();
    }   

    get current(){
        return this.data.find(item => item.id === this.selectedId);
    }

    toggle(){        
        this.isOpen ? this.close() : this.open();
    }

    get isOpen(){
        return this.$el.classList.contains('open');
    }

    open(){
        this.$el.classList.add('open');
    }

    close(){
        this.$el.classList.remove('open');
    }

    destroy(){
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }

    hideFakeSelect(){
        if (this.fakeSelect !== null) {
            this.fakeSelect.remove();
        }           
    }
}





