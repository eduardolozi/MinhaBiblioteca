using Dominio.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Validations
{
    public class LivroValidator : AbstractValidator<Livro>
    {
        public LivroValidator() {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Titulo)
                .NotEmpty().WithMessage(MensagensDeErro.GeraErroCampoVazio("Título"))
                .NotNull().WithMessage(MensagensDeErro.GeraErroCampoNulo("Título"));

            RuleFor(x => x.Autor)
                .NotEmpty().WithMessage(MensagensDeErro.GeraErroCampoVazio("Autor"))
                .NotNull().WithMessage(MensagensDeErro.GeraErroCampoNulo("Autor"))
                .Matches(@"^[a-zA-Z]*$").WithMessage(MensagensDeErro.ACEITA_APENAS_LETRAS_E_ESPACOS);

            RuleFor(x => x.DataDePublicao)
                .GreaterThan(DateTime.Now).WithMessage(MensagensDeErro.DATA_MAIOR);

            RuleFor(x => x.StatusDeProgresso)
                .NotNull().WithMessage(MensagensDeErro.GeraErroCampoNulo("Status de Progresso"));

            RuleFor(x => x.Genero)
                .IsInEnum().WithMessage(MensagensDeErro.GENERO_NAO_EXISTENTE);

            RuleFor(x => x.QuantidadeDePaginas)
                .GreaterThan(49).WithMessage(MensagensDeErro.QTD_PAGINAS_INVALIDAS);
        }

    }
}
