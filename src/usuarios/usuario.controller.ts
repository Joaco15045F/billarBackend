import { Controller, Get, Post, Param, Body, Delete } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.entity";

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService){}

    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }


    @Get(':id')
    findOne(@Param('id') id: number): Promise<Usuario | null >{
        return this.usuarioService.findOne(id);
    }


    @Post()
    create(@Body() usuario: Partial<Usuario>): Promise<Usuario> {
        return this.usuarioService.create(usuario);
    }


    @Delete(':id')
    remove(@Param('id') id: number){
        return this.usuarioService.remove(id);
    }
}