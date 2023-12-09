using Dominio.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace Infra.Database
{
    public class LivroContext : DbContext
    {
        public DbSet<Livro> Livros { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["LivrariaBD"].ConnectionString);
        }
    }
}
