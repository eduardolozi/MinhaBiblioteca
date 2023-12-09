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
        public LivroValidator() { }        
    }
}
