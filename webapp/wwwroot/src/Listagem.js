import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import foto1 from "./Imagens/knulp.jpg"
import foto2 from "./Imagens/confissoes.jpg"
import foto3 from "./Imagens/HP.jpg"
import Typography from "@mui/material/Typography";

export default function AlignItemsList() {
  return (
    <List sx={{ width: "100%", maxWidth: "100", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={foto1} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body1" style={{ color: "#FFFFFF" }}>
              Harry Potter e A Pedra Filosofal
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                J.K Rowling
              </Typography>
              {
                " - Harry Potter é um garoto órfão que vive infeliz com seus tios, os Dursleys. Ele recebe uma carta contendo um convite para ingressar em Hogwarts, uma famosa escola especializada em formar jovens bruxos."
              }
            </React.Fragment>
          }
        />
      </ListItem>

      <Divider variant="inset" component="li" />

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src={foto2} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body1" style={{ color: "#FFFFFF" }}>
              Knulp
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Hermann Hesse
              </Typography>
              {
                " — As três histórias da vida do andarilho Knulp estão entre os textos mais encantadores de Hermann Hesse."
              }
            </React.Fragment>
          }
        />
      </ListItem>

      <Divider variant="inset" component="li" />

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={foto3} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body1" style={{ color: "#FFFFFF" }}>
              Confissões
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Kanae Minato
              </Typography>
              {
                " — Seus alunos mataram sua filha. Agora ela quer se vingar. Mais de três milhões de exemplares vendidos. O mundo da professora Yuko Moriguchi girava em torno da pequena Manami, uma garotinha de 4 anos apaixonada por coelhinhos."
              }
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
