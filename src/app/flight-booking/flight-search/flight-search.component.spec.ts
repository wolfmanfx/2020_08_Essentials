import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { FlightSearchComponent } from './flight-search.component';
import { FlightBookingModule } from './../flight-booking.module';
import { HttpClientModule } from '@angular/common/http';
import { FlightService, DummyFlightService } from './flight.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FlightBookingModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        /* FlightSearchComponent <-- already comes w/ FlightBookingModule */
      ],
      // providers: [
      //   {
      //     provide: FlightService,
      //     useClass: DummyFlightService
      //   }
      // ]
    })
    .overrideComponent(
      FlightSearchComponent, {
      set: {
        providers: [
          {
            provide: FlightService,
            useClass: DummyFlightService
        }
      ]
    }
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
  });

  it('should have no flights initially', () => {
    expect(component.selectedFlight).toBeUndefined();
  });

  it('should not load flights w/o from and to', () => {
    component.from = '';
    component.to = '';
    component.search();
    expect(component.flights.length).toBe(0);
  });

  it('should load flights w/ from and to', () => {

    const flightService = fixture.debugElement.injector.get(FlightService);
    spyOn(flightService, 'find').and.callThrough();

    component.from = 'Graz';
    component.to = 'Hamburg';
    component.search();

    expect(component.flights.length).toBe(3);
    expect(flightService.find).toHaveBeenCalledWith('Graz', 'Hamburg');
  });

  it('should have a disabled search button w/o params', fakeAsync(() => {

    // Intial Databinding, ngOnInit
    fixture.detectChanges();
    tick();

    // Get input field for from
    const from = fixture
                  .debugElement
                  .query(By.css('input[name=from]'))
                  .nativeElement;

    from.value = '';
    from.dispatchEvent(new Event('input'));

    // Get input field for to

    const to = fixture
               .debugElement
               .query(By.css('input[name=to]'))
               .nativeElement;

    to.value = '';
    to.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    // get disabled
    const disabled = fixture
                     .debugElement
                     .query(By.css('button'))
                     .properties['disabled'];

    expect(disabled).toBeTruthy();

  }));

});
