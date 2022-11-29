import * as yup from 'yup';

export const userFormSchema = yup.object().shape({
    email: yup.string().required('Por favor, digite seu Email!').email('Por favor, digite um email válido'),
    
    senha: yup.string().required('Por favor, digite sua senha!').min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export const cadastrarEdicaoFormSchema = yup.object().shape({
    nome: yup.string().required('Por favor, digite o nome da edição'),

    dataInicial: yup.string().required('Por favor informe a data inicial'),

    dataFinal: yup.string().required('Por favor informe a data final')
})