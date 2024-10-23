import emailjs from 'emailjs-com';

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
        this.description = document.querySelector("descricao") as HTMLTextAreaElement;
        this.form = document.querySelector("#form") as HTMLFormElement;
        this.formInput = document.querySelector("#curriculo") as HTMLInputElement;

        this.form.addEventListener("submit", (e)=> this.HandleSubmit(e))
    }

    private validarEmail(email:string):boolean{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
        return emailRegex.test(email)
    }

    private validarTelefone(numero:string):boolean{
        const numeroRegex =  /^\(\d{2}\)\d{9}$/
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

        const formData = new FormData();
        formData.append("nome", this.name.value);
        formData.append("curso", this.attend.value);
        formData.append("vaga", this.jobVacancy.value);
        formData.append("experiencia", this.exp.value);
        formData.append("email", this.email.value);
        formData.append("telefone", this.phoneNumber.value);
        formData.append("descricao", this.description.value);

        if(this.formInput.files && this.formInput.files[0]){
            formData.append("curriculo", this.formInput.files[0])
        }

        emailjs.sendForm(ServiceID, template_ID,this.form)
        .then((response:any)=>{
            alert("Formulário enviado com sucesso")
            console.log("Sucesso!", response.status, response.text)
        }),(error:any)=>{
            alert("Houve um erro")
            console.log("Falha....", error)
        }

        const WhatsAppMessage = `
            Nome: ${this.name.value}
            Curso: ${this.attend.value}
            Vaga: ${this.jobVacancy.value}
            Experiência: ${this.exp.value}
            Email: ${this.email.value}
            Telefone: ${this.phoneNumber.value}
            Descrição: ${this.description.value}
        `.replace(/\s+/g,'%20')

        const WhatsAppURL = `https://wa.me/+5531997661152?text=${WhatsAppMessage}`
        window.open(WhatsAppURL, '_blank')
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    new Forms()
})