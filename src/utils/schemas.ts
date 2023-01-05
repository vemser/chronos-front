import * as yup from 'yup'

export const userFormSchema = yup.object().shape({
  username: yup
    .string()
    .required('Por favor, digite seu Login!'),

  password: yup
    .string()
    .required('Por favor, digite sua senha!')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export const editarPerfilFormSchema = yup.object().shape({
  nome: yup.string().required('Por favor, digite seu nome!'),
  senhaAtual: yup
    .string()
    .required('Digite a senha atual '),

  novaSenha: yup
    .string()
    .required('Senha Obrigatória')
    .matches(/(?=[A-Z])/, 'A senha deve ter, no mínimo, uma letra maiúscula')
    .matches(/(?=[a-z])/, 'A senha deve ter, no mínimo, uma letra minúscula')
    .matches(/(?=[0-9])/, 'A senha deve ter, no mínimo, um número')
    .matches(
      /(?=.[!@#$%^&*._])/,
      'A senha deve ter, no mínimo, um caractere especial'
    )
    .min(8, 'A senha deve ter, no mínimo, 8 caracteres'),

  confirmacaoNovaSenha: yup
    .string()
    .oneOf([yup.ref('novaSenha')], 'Senhas não coincidem'),
})

export const cadastrarEdicaoFormSchema = yup.object().shape({
  nome: yup.string().required('Por favor, digite o nome da edição'),

  dataInicial: yup.string().required('Por favor informe a data inicial'),
})

export const cadastrarDiaNaoUtilFormSchema = yup.object().shape({
  descricao: yup
    .string()
    .required('Por favor, digite uma descrição do dia não útil'),

  dataInicial: yup.string().required('Por favor informe a data inicial')
})

export const cadastrarEtapaFormSchema = yup.object().shape({
  nome: yup
    .string()
    .required('Por favor, digite o nome da etapa')
    .min(3, 'O nome da etapa deve ter no mínimo 3 caracteres'),

  ordemExecucao: yup.number().required('Por favor informe a ordem de execução')
})

export const CadastroDePessoasSchema = yup.object().shape({
  login: yup
    .string()
    .required('Por favor, digite o nome do colaborador')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .matches(/^[a-z.]+$/, 'Por favor, digite um nome de usuário válido'),
})

export const EtapaSchema = yup.object().shape({
  nome: yup
    .string()
    .required('Por favor, digite o nome da etapa')
    .min(3, 'O nome da etapa deve ter no mínimo 3 caracteres'),
  ordemExecucao: yup.string().required('Por favor informe a ordem de execução').matches(/[0-9]+/g, 'Por favor, digite somente números')
})


export const ProcessoSchema = yup.object().shape({
  nome: yup.string().required('Por favor informe o nome do processo.').min(3, 'O nome do processo deve ter no mínimo 3 caracteres'),
  duracaoProcesso: yup.string().required('Por favor, informe a duração do processo.'),
  diasUteis: yup.string().required('Por favor, informe quantos os dias uteis do processo.'),
  ordemExecucao: yup.number().required('Por favor, informe a ordem de execução')
})
