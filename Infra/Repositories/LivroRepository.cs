using Dominio.Models;
using Infra.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repositories
{
    public class LivroRepository : IRepository
    {
        private readonly LivroContext _context;
        public LivroRepository(LivroContext context) { 
            _context = context;
        }
        public List<Livro> ObterTodos()
        {
            return _context.Livros.ToList();
        }
        public Livro ObterPorId(int id)
        {
            var livro = _context.Livros.FirstOrDefault(p => p.LivroId == id);
            return livro;
        }
        public void Adicionar(Livro livro)
        {
            using (_context)
            {
                _context.Add<Livro>(livro);
                _context.SaveChanges();
            }
        }
        public void Atualizar(Livro livroAtualizado)
        {
            using (_context)
            {
                var livroASerAtualizado = _context.Livros.Where(p => p.LivroId == livroAtualizado.LivroId).FirstOrDefault();
                if (livroASerAtualizado != null)
                {
                    _context.Entry(livroASerAtualizado).CurrentValues.SetValues(livroAtualizado);
                    _context.SaveChanges();
                }
            }
        }
        public void Remover(Livro livro)
        {
            using (_context)
            {
                _context.Remove<Livro>(livro);
                _context.SaveChanges();
            }
        }
    }
}
