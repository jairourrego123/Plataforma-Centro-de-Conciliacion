# Generated by Django 4.0.4 on 2022-05-11 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiConciliacionApp', '0003_alter_hechos_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='area',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='barrio',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='citacion',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='ciudad',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='departamento',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='documento',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='encuesta',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='estrato_socioeconomico',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='hechos',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='historico_solicitud',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='localidad',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='medio_conocimiento',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='objetivo_servicio',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='pais',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='perfil',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='persona',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='pregunta',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='relacion_area_perfil',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='relacion_citacion_persona',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='relacion_solicitud_persona',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='respuesta',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='rol',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='rol_permiso',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='solicitud',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='subtema',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='tema',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='tipo_cargo',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='tipo_cliente',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='tipo_documento',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='tipo_estado',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='tipo_medio',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='tipo_persona',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='tipo_resultado',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='tipo_servicio',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='tipo_vivienda',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='turno',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='State',
            field=models.BooleanField(blank=True, default=True),
        ),
    ]
