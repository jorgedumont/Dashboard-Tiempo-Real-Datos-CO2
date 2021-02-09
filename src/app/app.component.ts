import { Chart } from 'chart.js';
import { ConexionService } from 'src/app/services/conexion.service';
import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items:any;
  items2:any;
  public chart: any = null;
  public chart2: any = null;

  constructor(private conexion: ConexionService) {
  }
  private ngOnInit(): void {
		this.chart = new Chart('realtime', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'Etvoc',
					fill: true,
					data: [],
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)'
				  }
				]
			  },
			  options: {
				tooltips: {
					enabled: false
				},
				legend: {
					display: true,
					position: 'top',
					labels: {
						fontColor: 'white'
					}
				},
				scales: {
          display: true,
				  yAxes: [{
          display: true,
					  ticks: {
						  fontColor: "white"
					  }
				  }],
				  xAxes: [{
          display: true,
					ticks: {
						fontColor: "white",
						beginAtZero: true
					}
				  }]
				}
			  }
    });
    this.chart2 = new Chart('realtime2', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'Eco2',
					fill: true,
					data: [],
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)'
				  }
				]
			  },
			  options: {
				tooltips: {
					enabled: false
				},
				legend: {
					display: true,
					position: 'top',
					labels: {
						fontColor: 'white'
					}
				},
				scales: {
          display: true,
				  yAxes: [{
          display: true,
					  ticks: {
						  fontColor: "white"
					  }
				  }],
				  xAxes: [{
          display: true,
					ticks: {
						fontColor: "white",
						beginAtZero: true
					}
				  }]
				}
			  }
    });
    this.showData();
    
    this.conexion.listaItem()
    .subscribe(item => {
      this.items= item;
      })
	}

	private showData(): void {
		this.conexion.listaItem2()
      .subscribe(item2 => {
        this.items2= item2;
        this.items2.forEach((valor: { eco2: any; etvoc: any; timestamp: any; }) => {
          if(this.chart.data.labels.length > 14) {
            this.chart.data.labels.shift();
            this.chart.data.datasets[0].data.shift();
           }
          this.chart.data.labels.push(valor.timestamp);
          this.chart.data.datasets[0].data.push(valor.etvoc)
          this.chart.update();
           
           if(this.chart2.data.labels.length > 14) {
            this.chart2.data.labels.shift();
            this.chart2.data.datasets[0].data.shift();
           }
           this.chart2.data.labels.push(valor.timestamp);
           this.chart2.data.datasets[0].data.push(valor.eco2)
           this.chart2.update();
        })
      })
	}
  
  
     
}

