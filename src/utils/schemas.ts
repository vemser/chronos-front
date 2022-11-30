import * as yup from 'yup'

export const userFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Por favor, digite seu Email!')
    .email('Por favor, digite um email válido'),

  senha: yup
    .string()
    .required('Por favor, digite sua senha!')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export const cadastrarEdicaoFormSchema = yup.object().shape({
  nome: yup.string().required('Por favor, digite o nome da edição'),

  dataInicial: yup.string().required('Por favor informe a data inicial'),

  dataFinal: yup.string().required('Por favor informe a data final')
})

export const cadastrarDiaNaoUtilFormSchema = yup.object().shape({
  descricao: yup
    .string()
    .required('Por favor, digite uma descrição do dia não útil'),

  dataInicial: yup.string().required('Por favor informe a data inicial'),

  dataFinal: yup.string().required('Por favor informe a data final')
})

export const cadastrarEtapaFormSchema = yup.object().shape({
  nome: yup
    .string()
    .required('Por favor, digite o nome da etapa')
    .min(3, 'O nome da etapa deve ter no mínimo 3 caracteres'),

  ordemExecucao: yup.number().required('Por favor informe a ordem de execução')
})

export const CadastroDePessoasSchema = yup.object().shape({
  nome: yup
    .string()
    .required('Por favor, digite o nome do colaborador')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .matches(/^[aA-zZ\s]+$/, 'Por favor, digite somente caracteres '),

  email: yup
    .string()
    .required('Por favor, digite seu Email!')
    .email('Por favor, digite um email válido')
})
