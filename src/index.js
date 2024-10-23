"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailjs_com_1 = __importDefault(require("emailjs-com"));
require("../css/styles.css");
const template_ID = "template_iltbw4k";
const ServiceID = "servico_rh_forms";
const PublicKey = "yHbyIk1UzgONx2h86";
emailjs_com_1.default.init(PublicKey);
class Forms {
    constructor() {
        this.name = document.querySelector("#nome");
        this.attend = document.querySelector("#curso");
        this.jobVacancy = document.querySelector("#vaga");
        this.exp = document.querySelector("#exp");
        this.email = document.querySelector("#email");
        this.phoneNumber = document.querySelector("#telefone");
        this.description = document.querySelector("#descricao");
        this.form = document.querySelector("#form");
        this.formInput = document.querySelector("#curriculo");
        this.form.addEventListener("submit", (e) => this.HandleSubmit(e));
    }
    validarEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(email);
    }
    validarTelefone(numero) {
        const numeroRegex = /^\(\d{2}\)\d{9}$/;
        return numeroRegex.test(numero);
    }
    HandleSubmit(event) {
        event.preventDefault();
        if (!this.validarEmail(this.email.value)) {
            alert("Por favor, insira um e-mail válido do Gmail (@gmail.com).");
            return;
        }
        if (!this.validarTelefone(this.phoneNumber.value)) {
            alert("Por favor, insira um número de telefone no formato correto, por exemplo (31)9XXXXXXX.");
            return;
        }
        const templateParams = {
            from_name: this.name.value,
            from_email: this.email.value,
            attend: this.attend.value,
            phone_number: this.phoneNumber.value,
            job_vacancy: this.jobVacancy.value,
            experience: this.exp.value,
            curriculo: this.formInput.value,
            description: this.description.value,
        };
        emailjs_com_1.default.send(ServiceID, template_ID, templateParams)
            .then((response) => {
            alert("Formulário enviado com sucesso");
            console.log("Sucesso!", response.status, response.text);
        }, (error) => {
            alert("Houve um erro");
            console.log("Falha....", error);
        });
        // Enviar via WhatsApp
        const WhatsAppMessage = `
            Nome: ${this.name.value}\n
            Curso: ${this.attend.value}\n
            Vaga: ${this.jobVacancy.value}\n
            Experiência: ${this.exp.value}\n
            Email: ${this.email.value}\n
            Telefone: ${this.phoneNumber.value}\n
            Descrição: ${this.description.value}\n
            Currículo: ${this.formInput.value}\n
        `.replace(/\s+/g, '%20');
        const WhatsAppURL = `https://wa.me/+5531991516755?text=${WhatsAppMessage}`;
        window.open(WhatsAppURL, '_blank');
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new Forms();
});
