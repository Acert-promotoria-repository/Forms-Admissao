import emailjs from 'emailjs-com';
import '../css/styles.css'

const template_ID = "template_vpi4xsu";
const ServiceID = "service_forms_admissao";
const PublicKey = "_eQ20dD_VcIvrwYWO"

emailjs.init(PublicKey)

class Forms {
    private name: HTMLInputElement;
    private attend: HTMLInputElement;
    private jobVacancy: HTMLInputElement;
    private exp: HTMLInputElement;
    private email: HTMLInputElement;
    private phoneNumber: HTMLInputElement;
    private description: HTMLTextAreaElement;
    private form: HTMLFormElement;
    private formInput: HTMLInputElement;
    

    constructor() {
        this.name = document.querySelector("#nome") as HTMLInputElement;
        this.attend = document.querySelector("#curso") as HTMLInputElement;
        this.jobVacancy = document.querySelector("#vaga") as HTMLInputElement;
        this.exp = document.querySelector("#exp") as HTMLInputElement;
        this.email = document.querySelector("#email") as HTMLInputElement;
        this.phoneNumber = document.querySelector("#telefone") as HTMLInputElement;
        this.description = document.querySelector("#descricao") as HTMLTextAreaElement;
        this.form = document.querySelector("#form") as HTMLFormElement;
        this.formInput = document.querySelector("#curriculo") as HTMLInputElement;

        this.form.addEventListener("submit", (e)=> this.HandleSubmit(e))
    }

    private validarEmail(email:string):boolean{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
        return emailRegex.test(email)
    }

    private validarTelefone(numero:string):boolean{
        const numeroRegex =  /^\\d{2}\\d{9}$/
        return numeroRegex.test(numero)
    }

    private HandleSubmit(event:Event):void{
        event.preventDefault()
        
        if(!this.validarEmail(this.email.value)){
            alert("Por favor, insira um e-mail válido do Gmail (@gmail.com).")
            return;
        } 

        if(!this.validarTelefone(this.phoneNumber.value)){
            alert("Por favor, insira um número de telefone no formato correto, por exemplo (31)9XXXXXXX.")
        }

        const templateParams = {
            from_name: this.name.value,
            from_email: this.email.value,
            attend:this.attend.value,
            phone_number: this.phoneNumber.value,
            job_vacancy: this.jobVacancy.value,
            experience: this.exp.value,
            curriculo: this.formInput.value,
            description: this.description.value,
        }

        const formData = new FormData();
        formData.append("nome", templateParams.from_name);
        formData.append("curso", templateParams.attend);
        formData.append("vaga", templateParams.job_vacancy);
        formData.append("experiencia", templateParams.experience);
        formData.append("email", templateParams.phone_number);
        formData.append("descricao", this.description.value);
        formData.append("curriculo",templateParams.curriculo)
        

        emailjs.sendForm(ServiceID, template_ID,this.form)
        .then((response:any)=>{
            alert("Formulário enviado com sucesso")
            console.log("Sucesso!", response.status, response.text)
        }),(error:any)=>{
            alert("Houve um erro")
            console.log("Falha....", error)
        }

        const WhatsAppMessage = `
            Nome: ${this.name.value}\n
            Curso: ${this.attend.value}\n
            Vaga: ${this.jobVacancy.value}\n
            Experiência: ${this.exp.value}\n
            Email: ${this.email.value}\n
            Telefone: ${this.phoneNumber.value}\n
            Descrição: ${this.description.value}\n
            Currículo: ${this.formInput.value}\n
        `.replace(/\s+/g,'%20')

        const WhatsAppURL = `https://wa.me/+5531997661152?text=${WhatsAppMessage}`
        window.open(WhatsAppURL, '_blank')
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    new Forms()
})