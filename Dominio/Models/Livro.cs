using Dominio.Enums;

namespace Dominio.Models
{
    public class Livro
    {
        public int LivroId { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public DateTime DataDePublicao { get; set; }
        public GeneroEnum Genero { get; set; }
        public int QuantidadeDePaginas { get; set; }
        public bool StatusDeProgresso { get; set; }
        public string? fotoDaCapa { get; set; }
        public string? Comentario { get; set; }
        public AvalicaoEnum? Avaliacao { get; set; }
    }
}
