import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticulService } from '../articulos/articul.service';

@Component({
  selector: 'app-detallearticulo',
  templateUrl: './detallearticulo.page.html',
  styleUrls: ['./detallearticulo.page.scss'],
})
export class DetallearticuloPage implements OnInit {

  articulo = null;

  constructor(private route: ActivatedRoute, private articulService: ArticulService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.articulService.getarticulo(id).subscribe((res) => {
      this.articulo = res[0];
    });
  }

}
