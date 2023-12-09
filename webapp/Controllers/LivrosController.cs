using Dominio.Models;
using Dominio.Validations;
using FluentValidation.Results;
using FluentValidation.TestHelper;
using Infra.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LivrosController : ControllerBase
    {
        private readonly IRepository _repo;
        private readonly LivroValidator _validacao;
        public LivrosController(IRepository repo, LivroValidator validacao) {
            _repo = repo;
            _validacao = validacao;
        }

        [HttpGet]
        public IActionResult ObterTodos()
        {
            try
            {
                var livros = _repo.ObterTodos();
                return Ok(livros);
            }catch(Exception)
            {
                return NotFound();
            }
        }

        [HttpGet("/id")]
        public IActionResult ObterPorId(int id) {
            try
            {
                var livro = _repo.ObterPorId(id);
                return Ok(livro);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
