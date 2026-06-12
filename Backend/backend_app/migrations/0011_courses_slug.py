# Manually edited to handle existing rows safely

from django.db import migrations, models
from django.utils.text import slugify


def populate_course_slugs(apps, schema_editor):
    courses_model = apps.get_model('backend_app', 'courses')
    seen = {}
    for course in courses_model.objects.all():
        base = slugify(course.title) or f'course-{course.pk}'
        slug = base
        counter = 1
        while slug in seen:
            slug = f'{base}-{counter}'
            counter += 1
        seen[slug] = True
        course.slug = slug
        course.save(update_fields=['slug'])


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0010_packages_slug'),
    ]

    operations = [
        # Step 1: Add slug as nullable (no unique constraint yet)
        migrations.AddField(
            model_name='courses',
            name='slug',
            field=models.SlugField(max_length=200, blank=True, null=True),
        ),
        # Step 2: Populate slugs from existing titles
        migrations.RunPython(populate_course_slugs, migrations.RunPython.noop),
        # Step 3: Now make it unique and non-nullable
        migrations.AlterField(
            model_name='courses',
            name='slug',
            field=models.SlugField(max_length=200, unique=True, blank=True),
        ),
    ]
