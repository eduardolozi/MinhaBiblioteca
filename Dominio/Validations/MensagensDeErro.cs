using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Validations
{
    public class MensagensDeErro
    {
        public static string CAMPO_VAZIO = "não pode ser vazio.\n";
        public static string CAMPO_NULO = "não pode ser nulo.\n";
        public static string ACEITA_APENAS_LETRAS_E_ESPACOS = "Nome inválido, apenas letras e espaços.";
        public static string TAMANHO_INVALIDO = "Tamanho da entrada inválida.\n";
        public static string QTD_PAGINAS_INVALIDAS = "Quantidade de páginas inválidas (Mínimo: 49).\n";
        public static string DATA_MAIOR = $"Data inválida (Máxima: {DateTime.UtcNow.ToShortDateString}).\n";
        public static string GENERO_NAO_EXISTENTE = $"Gênero não existente.\n";

        public static string GeraErroCampoVazio(string campo)
        {
            string mensagem = $"O {campo} {CAMPO_VAZIO}";
            return mensagem;
        }
        public static string GeraErroCampoNulo(string campo)
        {
            string mensagem = $"O {campo} {CAMPO_NULO}";
            return mensagem;
        }
    }
}
