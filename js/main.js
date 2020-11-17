/**
 * Boolzapp Vue
 */
var app = new Vue({
    el: '#app',
    data: {
        // nostro account
        user: {
            name: 'Nome Utente',
            avatar: '_io'
        },
        chatIndex: 0,
        currentMessage: '',
        searchText: '',
        chatMenuVisible: 'hidden',
        // Elenco contatti
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                lastAccess: '16:15',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                lastAccess: '16:35',
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                lastAccess: '16:15',
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                lastAccess: '15:50',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
    }, // <- End Data
    methods: {
        /**
         * Send the message written in input and generate an auto reply
         */
        sendMessage() {
            if(this.currentMessage.trim()) {
                const activeContact = this.contacts[this.chatIndex];
                this.printMessage(this.currentMessage, 'sent', activeContact);
                this.currentMessage = '';
                setTimeout(() => {
                    this.printMessage('ok', 'received', activeContact);
                    activeContact.lastAccess = dayjs().format('HH:mm');
                }, 1000);
            }
        },
        /**
         * Print a message in chat
         * @param {string} message
         * @param {string} status
         * @param {object} activeContact
         */
        printMessage(message, status, activeContact) {
            activeContact.messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message,
                    status
                });
                this.autoScroll();
        },
        /**
         * Search for one or more contacts while typing in search input
         */
        searchContacts() {
            this.contacts.forEach((contact) => {
                contact.visible = contact.name.toLowerCase().includes(this.searchText.toLowerCase().trim());
            });
        },
        /**
         * Auto scroll at the end of the chat
         */
        autoScroll() {
            let scrollable = document.getElementsByClassName('main-chat')[0];
            scrollable.scrollTop = scrollable.scrollTopMax;
        },
        /**
         * Delete the selected message
         * @param {object} message 
         */
        deleteMsg(message) {
            message.message = 'Messaggio cancellato';
            message.date = '';
            message.status += ' deleted';
        },
        /**
         * Show chat menu when clicking on icon
         */
        showChatMenu() {
            this.chatMenuVisible = 'show';
        },
        /**
         * Hide chat menu when clicking everywhere
         */
        hideChatMenu() {
            this.chatMenuVisible = 'hidden';
        },
        /**
         * Delete every message in the chat
         */
        deleteChat() {
            this.contacts[this.chatIndex].messages.map((message) => {
                message.message = 'Messaggio cancellato',
                message.date = '',
                message.status += ' deleted'
            });
        }

    } // <- End Methods
});