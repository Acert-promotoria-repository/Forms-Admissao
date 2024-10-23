"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailjs_com_1 = __importDefault(require("emailjs-com"));
require("../css/styles.css");
const template_ID = "template_vpi4xsu";
const ServiceID = "service_forms_admissao";
const PublicKey = "_eQ20dD_VcIvrwYWO";
emailjs_com_1.default.init(PublicKey);
class Forms {
    constructor() {
        this.name = document.querySelector("#nome");
        this.attend = document.querySelector("#curso");
        this.jobVacancy = document.querySelector("#vaga");
        this.exp = document.querySelector("#exp");
        this.email = document.querySelector("#email");
        this.phoneNumber = document.querySelector("#telefone");
        this.description = document.querySelector("descricao");
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
        }
        const formData = new FormData();
        formData.append("nome", this.name.value);
        formData.append("curso", this.attend.value);
        formData.append("vaga", this.jobVacancy.value);
        formData.append("experiencia", this.exp.value);
        formData.append("email", this.email.value);
        formData.append("telefone", this.phoneNumber.value);
        formData.append("descricao", this.description.value);
        if (this.formInput.files && this.formInput.files[0]) {
            formData.append("curriculo", this.formInput.files[0]);
        }
        emailjs_com_1.default.sendForm(ServiceID, template_ID, this.form)
            .then((response) => {
            alert("Formulário enviado com sucesso");
            console.log("Sucesso!", response.status, response.text);
        }), (error) => {
            alert("Houve um erro");
            console.log("Falha....", error);
        };
        const WhatsAppMessage = `
            Nome: ${this.name.value}
            Curso: ${this.attend.value}
            Vaga: ${this.jobVacancy.value}
            Experiência: ${this.exp.value}
            Email: ${this.email.value}
            Telefone: ${this.phoneNumber.value}
            Descrição: ${this.description.value}
        `.replace(/\s+/g, '%20');
        const WhatsAppURL = `https://wa.me/+5531997661152?text=${WhatsAppMessage}`;
        window.open(WhatsAppURL, '_blank');
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new Forms();
});
