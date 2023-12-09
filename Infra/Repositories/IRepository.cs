using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Models;

namespace Infra.Repositories
{
    public interface IRepository
    {
        public List<Livro> ObterTodos();
        public Livro ObterPorId(int id);
        public void Adicionar(Livro livro);
        public void Atualizar(Livro livro);
        public void Remover(Livro livro);
    }
}
