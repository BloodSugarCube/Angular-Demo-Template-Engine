class SimpleMenu {
    constructor(triggerId, triggerActiveClass, listId, listActiveClass) {
        this.trigger = document.getElementById(triggerId);
        this.list = document.getElementById(listId);
        this.triggerActiveClass = triggerActiveClass;
        this.listActiveClass = listActiveClass;

        if (this.trigger === null) {
            throw new SimpleMenuException('Некорректный id триггера меню');
        }
        if (this.list === null) {
            throw new SimpleMenuException('Некорректный id списка меню');
        }
        if (
            typeof this.triggerActiveClass !== 'string'
            || this.triggerActiveClass === ''
            ) {
            throw new SimpleMenuException('Некорректный активный класс триггера');
        }
        if (
            typeof this.listActiveClass !== 'string'
            || this.listActiveClass === ''
            ) {
            throw new SimpleMenuException('Некорректный активный класс списка');
        }

        this.trigger.addEventListener("click", (event) => {
            event.preventDefault();

            this.toggleMenu();
        });

        document.addEventListener('click', (event) => {
            if (!this.isMenuElement(event.target)) {
                this.disable();
            }
        })
    }

    toggleMenu() {
        let triggerActive = this.trigger.classList.contains(this.triggerActiveClass);
        let listActive = this.list.classList.contains(this.listActiveClass);

        if (triggerActive || listActive) {
            this.disable();
            return;
        }

        this.enable();
    }

    enable() {
        this.trigger.classList.add(this.triggerActiveClass);
        this.list.classList.add(this.listActiveClass);
    }

    disable() {
        this.trigger.classList.remove(this.triggerActiveClass);
        this.list.classList.remove(this.listActiveClass);
    }

    isMenuElement(element) {
        if (this.trigger.contains(element)) {
            return true;
        }
        if (this.list.contains(element)) {
            return true;
        }

        return false;
    }
}

function SimpleMenuException(message) {
    this.message = message;
}