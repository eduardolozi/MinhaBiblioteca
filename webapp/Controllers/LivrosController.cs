﻿using Dominio.Models;
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
        public ActionResult<List<Livro>> ObterTodos()
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

        [HttpGet("{id}")]
        public ActionResult<Livro> ObterPorId([FromRoute] int id) {
            try
            {
                var livro = _repo.ObterPorId(id);
                if(livro == null) return NotFound();
                return Ok(livro);
            }catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Adicionar([FromBody] Livro livro)
        {
            try
            {
                _repo.Adicionar(livro);
                return Ok(livro);
            }catch(Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar([FromRoute] int id, [FromBody] Livro livro)
        {
            try
            {
                if (_repo.ObterPorId(id) == null) throw new Exception("Id não encontrado");
                livro.LivroId = id;
                _repo.Atualizar(livro);
                return Ok(livro);
            }
            catch (Exception e) when (e.Message.Equals("Id não encontrado"))
            {
                return NotFound();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Remover([FromRoute] int id)
        {
            try
            {
                var livro = _repo.ObterPorId(id);
                if(livro == null) throw new Exception("Id não encontrado");
                _repo.Remover(livro);
                return Ok(livro);
            }
            catch (Exception e) when (e.Message.Equals("Id não encontrado"))
            {
                return NotFound();
            }catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
